<?php

/* TwigBundle:Exception:error.css.twig */
class __TwigTemplate_67b37389a9b44b985c994e76253eb46274a827fa93685caa0d0dc1fb29e9cc41 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_c256fab6e4c44f7fb9f5765e226df3c97ea120e81a9def1be893dbfa07a5e90b = $this->env->getExtension("native_profiler");
        $__internal_c256fab6e4c44f7fb9f5765e226df3c97ea120e81a9def1be893dbfa07a5e90b->enter($__internal_c256fab6e4c44f7fb9f5765e226df3c97ea120e81a9def1be893dbfa07a5e90b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.css.twig"));

        // line 1
        echo "/*
";
        // line 2
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code")), "css", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text")), "css", null, true);
        echo "

*/
";
        
        $__internal_c256fab6e4c44f7fb9f5765e226df3c97ea120e81a9def1be893dbfa07a5e90b->leave($__internal_c256fab6e4c44f7fb9f5765e226df3c97ea120e81a9def1be893dbfa07a5e90b_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.css.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  25 => 2,  22 => 1,);
    }
}
/* /**/
/* {{ status_code }} {{ status_text }}*/
/* */
/* *//* */
/* */
