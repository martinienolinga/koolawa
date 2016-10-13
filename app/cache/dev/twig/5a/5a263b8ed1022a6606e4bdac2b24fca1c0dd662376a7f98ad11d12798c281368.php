<?php

/* WebProfilerBundle:Collector:router.html.twig */
class __TwigTemplate_8aa1ef16ab211fb8556916df768d18b4d2c34003998b52f918a2218e6664b776 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@WebProfiler/Profiler/layout.html.twig", "WebProfilerBundle:Collector:router.html.twig", 1);
        $this->blocks = array(
            'toolbar' => array($this, 'block_toolbar'),
            'menu' => array($this, 'block_menu'),
            'panel' => array($this, 'block_panel'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "@WebProfiler/Profiler/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_b3793d24e1e2a824040800d64a85a5c35f2f4a6b32fdb8fa051029544c5573e2 = $this->env->getExtension("native_profiler");
        $__internal_b3793d24e1e2a824040800d64a85a5c35f2f4a6b32fdb8fa051029544c5573e2->enter($__internal_b3793d24e1e2a824040800d64a85a5c35f2f4a6b32fdb8fa051029544c5573e2_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "WebProfilerBundle:Collector:router.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_b3793d24e1e2a824040800d64a85a5c35f2f4a6b32fdb8fa051029544c5573e2->leave($__internal_b3793d24e1e2a824040800d64a85a5c35f2f4a6b32fdb8fa051029544c5573e2_prof);

    }

    // line 3
    public function block_toolbar($context, array $blocks = array())
    {
        $__internal_11625c9dcaa7c2b43eb6d5af3258366a0f994fc87eafd68816effafb39e1040b = $this->env->getExtension("native_profiler");
        $__internal_11625c9dcaa7c2b43eb6d5af3258366a0f994fc87eafd68816effafb39e1040b->enter($__internal_11625c9dcaa7c2b43eb6d5af3258366a0f994fc87eafd68816effafb39e1040b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "toolbar"));

        
        $__internal_11625c9dcaa7c2b43eb6d5af3258366a0f994fc87eafd68816effafb39e1040b->leave($__internal_11625c9dcaa7c2b43eb6d5af3258366a0f994fc87eafd68816effafb39e1040b_prof);

    }

    // line 5
    public function block_menu($context, array $blocks = array())
    {
        $__internal_337456a21496ef79efb53b11f959e372d30faec3707691f57c11147d4aee6ce9 = $this->env->getExtension("native_profiler");
        $__internal_337456a21496ef79efb53b11f959e372d30faec3707691f57c11147d4aee6ce9->enter($__internal_337456a21496ef79efb53b11f959e372d30faec3707691f57c11147d4aee6ce9_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "menu"));

        // line 6
        echo "<span class=\"label\">
    <span class=\"icon\">";
        // line 7
        echo twig_include($this->env, $context, "@WebProfiler/Icon/router.svg");
        echo "</span>
    <strong>Routing</strong>
</span>
";
        
        $__internal_337456a21496ef79efb53b11f959e372d30faec3707691f57c11147d4aee6ce9->leave($__internal_337456a21496ef79efb53b11f959e372d30faec3707691f57c11147d4aee6ce9_prof);

    }

    // line 12
    public function block_panel($context, array $blocks = array())
    {
        $__internal_b84477e6b1c883a9a7fc03ca7f34bcbe28bea120655628125410c0bc4256a7f6 = $this->env->getExtension("native_profiler");
        $__internal_b84477e6b1c883a9a7fc03ca7f34bcbe28bea120655628125410c0bc4256a7f6->enter($__internal_b84477e6b1c883a9a7fc03ca7f34bcbe28bea120655628125410c0bc4256a7f6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "panel"));

        // line 13
        echo "    ";
        echo $this->env->getExtension('http_kernel')->renderFragment($this->env->getExtension('routing')->getPath("_profiler_router", array("token" => (isset($context["token"]) ? $context["token"] : $this->getContext($context, "token")))));
        echo "
";
        
        $__internal_b84477e6b1c883a9a7fc03ca7f34bcbe28bea120655628125410c0bc4256a7f6->leave($__internal_b84477e6b1c883a9a7fc03ca7f34bcbe28bea120655628125410c0bc4256a7f6_prof);

    }

    public function getTemplateName()
    {
        return "WebProfilerBundle:Collector:router.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  73 => 13,  67 => 12,  56 => 7,  53 => 6,  47 => 5,  36 => 3,  11 => 1,);
    }
}
/* {% extends '@WebProfiler/Profiler/layout.html.twig' %}*/
/* */
/* {% block toolbar %}{% endblock %}*/
/* */
/* {% block menu %}*/
/* <span class="label">*/
/*     <span class="icon">{{ include('@WebProfiler/Icon/router.svg') }}</span>*/
/*     <strong>Routing</strong>*/
/* </span>*/
/* {% endblock %}*/
/* */
/* {% block panel %}*/
/*     {{ render(path('_profiler_router', { token: token })) }}*/
/* {% endblock %}*/
/* */
