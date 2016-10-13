<?php

/* TwigBundle:Exception:error.atom.twig */
class __TwigTemplate_c1a9488aafc29b89cf6b9cc11fbc91855e884ae0f8a7ac1a9780149254ce60c7 extends Twig_Template
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
        $__internal_cbcb401dac9890e1d8f1b3ff7dac7a1ac7daea310c50f7e101a58b46b87b777b = $this->env->getExtension("native_profiler");
        $__internal_cbcb401dac9890e1d8f1b3ff7dac7a1ac7daea310c50f7e101a58b46b87b777b->enter($__internal_cbcb401dac9890e1d8f1b3ff7dac7a1ac7daea310c50f7e101a58b46b87b777b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.atom.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/error.xml.twig", "TwigBundle:Exception:error.atom.twig", 1)->display($context);
        
        $__internal_cbcb401dac9890e1d8f1b3ff7dac7a1ac7daea310c50f7e101a58b46b87b777b->leave($__internal_cbcb401dac9890e1d8f1b3ff7dac7a1ac7daea310c50f7e101a58b46b87b777b_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.atom.twig";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* {% include '@Twig/Exception/error.xml.twig' %}*/
/* */
