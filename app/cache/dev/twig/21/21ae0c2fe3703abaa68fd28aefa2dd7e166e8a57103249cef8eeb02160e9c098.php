<?php

/* WebProfilerBundle:Profiler:toolbar_redirect.html.twig */
class __TwigTemplate_53acfe3f16f4b693a3face048dd74028733b56246f7e490fe6b8e943138e582d extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@Twig/layout.html.twig", "WebProfilerBundle:Profiler:toolbar_redirect.html.twig", 1);
        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "@Twig/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_c97e01790dfd69fcd41baebc6fb6115a7b61d1433575fb69ba91177ed7a2cc5c = $this->env->getExtension("native_profiler");
        $__internal_c97e01790dfd69fcd41baebc6fb6115a7b61d1433575fb69ba91177ed7a2cc5c->enter($__internal_c97e01790dfd69fcd41baebc6fb6115a7b61d1433575fb69ba91177ed7a2cc5c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "WebProfilerBundle:Profiler:toolbar_redirect.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_c97e01790dfd69fcd41baebc6fb6115a7b61d1433575fb69ba91177ed7a2cc5c->leave($__internal_c97e01790dfd69fcd41baebc6fb6115a7b61d1433575fb69ba91177ed7a2cc5c_prof);

    }

    // line 3
    public function block_title($context, array $blocks = array())
    {
        $__internal_0e9f154b5e8aac44d15ce6a8e74674f7be3c15213e36f9944d7446b8c03b8385 = $this->env->getExtension("native_profiler");
        $__internal_0e9f154b5e8aac44d15ce6a8e74674f7be3c15213e36f9944d7446b8c03b8385->enter($__internal_0e9f154b5e8aac44d15ce6a8e74674f7be3c15213e36f9944d7446b8c03b8385_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "Redirection Intercepted";
        
        $__internal_0e9f154b5e8aac44d15ce6a8e74674f7be3c15213e36f9944d7446b8c03b8385->leave($__internal_0e9f154b5e8aac44d15ce6a8e74674f7be3c15213e36f9944d7446b8c03b8385_prof);

    }

    // line 5
    public function block_body($context, array $blocks = array())
    {
        $__internal_6a7cde2af9ee06d3cef0109581dc0868c654c416dc31756de60b423e6fd3a503 = $this->env->getExtension("native_profiler");
        $__internal_6a7cde2af9ee06d3cef0109581dc0868c654c416dc31756de60b423e6fd3a503->enter($__internal_6a7cde2af9ee06d3cef0109581dc0868c654c416dc31756de60b423e6fd3a503_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 6
        echo "    <div class=\"sf-reset\">
        <div class=\"block-exception\">
            <h1>This request redirects to <a href=\"";
        // line 8
        echo twig_escape_filter($this->env, (isset($context["location"]) ? $context["location"] : $this->getContext($context, "location")), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, (isset($context["location"]) ? $context["location"] : $this->getContext($context, "location")), "html", null, true);
        echo "</a>.</h1>

            <p>
                <small>
                    The redirect was intercepted by the web debug toolbar to help debugging.
                    For more information, see the \"intercept-redirects\" option of the Profiler.
                </small>
            </p>
        </div>
    </div>
";
        
        $__internal_6a7cde2af9ee06d3cef0109581dc0868c654c416dc31756de60b423e6fd3a503->leave($__internal_6a7cde2af9ee06d3cef0109581dc0868c654c416dc31756de60b423e6fd3a503_prof);

    }

    public function getTemplateName()
    {
        return "WebProfilerBundle:Profiler:toolbar_redirect.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  57 => 8,  53 => 6,  47 => 5,  35 => 3,  11 => 1,);
    }
}
/* {% extends '@Twig/layout.html.twig' %}*/
/* */
/* {% block title 'Redirection Intercepted' %}*/
/* */
/* {% block body %}*/
/*     <div class="sf-reset">*/
/*         <div class="block-exception">*/
/*             <h1>This request redirects to <a href="{{ location }}">{{ location }}</a>.</h1>*/
/* */
/*             <p>*/
/*                 <small>*/
/*                     The redirect was intercepted by the web debug toolbar to help debugging.*/
/*                     For more information, see the "intercept-redirects" option of the Profiler.*/
/*                 </small>*/
/*             </p>*/
/*         </div>*/
/*     </div>*/
/* {% endblock %}*/
/* */
